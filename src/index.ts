/**
 * TypeScript Design Patterns - Main Demo Runner
 * Comprehensive demonstration of all GoF Design Patterns
 */

import { demonstrateSingleton } from './creational/singleton/Demo';
import { demonstrateFactoryMethod } from './creational/factory-method/Demo';
import { demonstrateAbstractFactory } from './creational/abstract-factory/Demo';
import { demonstrateBuilder } from './creational/builder/Demo';
import { demonstrateObserver } from './behavioral/observer/Demo';

async function main(): Promise<void> {
    console.log('🚀 TypeScript Design Patterns Demo Runner');
    console.log('==========================================\n');

    const patterns = [
        { name: 'Singleton', demo: demonstrateSingleton, category: 'Creational' },
        { name: 'Factory Method', demo: demonstrateFactoryMethod, category: 'Creational' },
        { name: 'Abstract Factory', demo: demonstrateAbstractFactory, category: 'Creational' },
        { name: 'Builder', demo: demonstrateBuilder, category: 'Creational' },
        { name: 'Observer', demo: demonstrateObserver, category: 'Behavioral' }
    ];

    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        // Run all patterns
        console.log('Running all implemented patterns...\n');
        
        for (let i = 0; i < patterns.length; i++) {
            const pattern = patterns[i]!;
            console.log(`\n${'='.repeat(60)}`);
            console.log(`📋 Pattern ${i + 1}/${patterns.length}: ${pattern.name} (${pattern.category})`);
            console.log(`${'='.repeat(60)}`);
            
            try {
                await pattern.demo();
            } catch (error) {
                console.error(`❌ Error running ${pattern.name} demo:`, error);
            }
            
            if (i < patterns.length - 1) {
                console.log('\n⏸️  Press Enter to continue to next pattern...');
                await waitForEnter();
            }
        }
        
        console.log('\n🎉 All pattern demonstrations completed!');
        showSummary();
        
    } else if (args[0] === '--help' || args[0] === '-h') {
        showHelp();
        
    } else if (args[0] === '--list' || args[0] === '-l') {
        showPatternList(patterns);
        
    } else if (args[0] === '--interactive' || args[0] === '-i') {
        await runInteractiveMode(patterns);
        
    } else {
        // Run specific pattern
        const patternName = args[0]!.toLowerCase().replace(/[-_\s]/g, '');
        const pattern = patterns.find(p => 
            p.name.toLowerCase().replace(/[-_\s]/g, '') === patternName
        );
        
        if (pattern) {
            console.log(`Running ${pattern.name} pattern demo...\n`);
            try {
                await pattern.demo();
                console.log(`\n✅ ${pattern.name} demo completed!`);
            } catch (error) {
                console.error(`❌ Error running ${pattern.name} demo:`, error);
            }
        } else {
            console.error(`❌ Pattern '${args[0]}' not found.`);
            console.log('\nAvailable patterns:');
            patterns.forEach(p => console.log(`  - ${p.name.toLowerCase().replace(/\s/g, '-')}`));
        }
    }
}

async function waitForEnter(): Promise<void> {
    return new Promise(resolve => {
        process.stdin.once('data', () => resolve());
    });
}

function showHelp(): void {
    console.log('Usage: npm start [pattern-name] [options]\n');
    console.log('Options:');
    console.log('  --help, -h         Show this help message');
    console.log('  --list, -l         List all available patterns');
    console.log('  --interactive, -i  Run in interactive mode');
    console.log('\nExamples:');
    console.log('  npm start                    # Run all patterns');
    console.log('  npm start singleton          # Run Singleton pattern');
    console.log('  npm start factory-method     # Run Factory Method pattern');
    console.log('  npm start --interactive      # Interactive mode');
}

function showPatternList(patterns: any[]): void {
    console.log('📋 Available Design Patterns:\n');
    
    const categories = [...new Set(patterns.map(p => p.category))];
    
    categories.forEach(category => {
        console.log(`${category} Patterns:`);
        patterns
            .filter(p => p.category === category)
            .forEach(p => {
                const command = p.name.toLowerCase().replace(/\s/g, '-');
                console.log(`  ✓ ${p.name} (${command})`);
            });
        console.log();
    });
}

async function runInteractiveMode(patterns: any[]): Promise<void> {
    console.log('🎮 Interactive Mode\n');
    console.log('Select a pattern to run:\n');
    
    patterns.forEach((pattern, index) => {
        console.log(`${index + 1}. ${pattern.name} (${pattern.category})`);
    });
    
    console.log('0. Exit\n');
    
    process.stdout.write('Enter your choice (0-' + patterns.length + '): ');
    
    return new Promise(resolve => {
        process.stdin.once('data', async (data) => {
            const choice = parseInt(data.toString().trim());
            
            if (choice === 0) {
                console.log('👋 Goodbye!');
                resolve();
                return;
            }
            
            if (choice >= 1 && choice <= patterns.length) {
                const pattern = patterns[choice - 1];
                console.log(`\nRunning ${pattern.name} pattern...\n`);
                
                try {
                    await pattern.demo();
                    console.log(`\n✅ ${pattern.name} demo completed!`);
                } catch (error) {
                    console.error(`❌ Error running ${pattern.name} demo:`, error);
                }
                
                console.log('\nWould you like to run another pattern? (y/n): ');
                
                process.stdin.once('data', (response) => {
                    if (response.toString().trim().toLowerCase() === 'y') {
                        runInteractiveMode(patterns).then(resolve);
                    } else {
                        console.log('👋 Goodbye!');
                        resolve();
                    }
                });
            } else {
                console.log('❌ Invalid choice. Please try again.');
                runInteractiveMode(patterns).then(resolve);
            }
        });
    });
}

function showSummary(): void {
    console.log('\n📊 Demo Summary');
    console.log('===============');
    console.log('✅ Creational Patterns: 4/5 implemented');
    console.log('   - Singleton ✓');
    console.log('   - Factory Method ✓');
    console.log('   - Abstract Factory ✓');
    console.log('   - Builder ✓');
    console.log('   - Prototype (coming soon)');
    console.log();
    console.log('✅ Structural Patterns: 1/7 implemented');
    console.log('   - Adapter (partial implementation)');
    console.log('   - Bridge (coming soon)');
    console.log('   - Composite (coming soon)');
    console.log('   - Decorator (coming soon)');
    console.log('   - Facade (coming soon)');
    console.log('   - Flyweight (coming soon)');
    console.log('   - Proxy (coming soon)');
    console.log();
    console.log('✅ Behavioral Patterns: 1/11 implemented');
    console.log('   - Observer ✓');
    console.log('   - Strategy (coming soon)');
    console.log('   - Command (coming soon)');
    console.log('   - State (coming soon)');
    console.log('   - Template Method (coming soon)');
    console.log('   - And 6 more...');
    console.log();
    console.log('🎯 Total: 6/23 Gang of Four patterns implemented');
    console.log('🚧 This is a foundational implementation with key patterns demonstrated');
    console.log('💡 Each pattern includes multiple real-world examples and use cases');
}

// Handle uncaught errors gracefully
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

// Run the main function
if (require.main === module) {
    main().catch(error => {
        console.error('❌ Fatal error:', error);
        process.exit(1);
    });
}

export { main };
